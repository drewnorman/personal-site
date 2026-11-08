{
  description = "Astro static site for adre.me";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_22
              pkgs.yarn
              pkgs.firebase-tools
              pkgs.opentofu
              pkgs.just
            ] ++ pkgs.lib.optionals pkgs.stdenv.isLinux [ pkgs.chromium ];
          };
        });
    };
}
