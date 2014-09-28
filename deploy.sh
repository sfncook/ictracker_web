#!/bin/sh

[ $# -eq 0 ] && { echo "Usage: $0 [suffix] [version]"; exit 1; }

suffix=$1
version=$2

# Update version
echo "\$( document ).ready(function(){\$('#version_text').html('Version:${version}');});" > ./html/version.js

# Commit git
git add -A
git commit -m "ict_deploy_${suffix}_${version}"

tarfileName="deploy_pkg_${suffix}_${version}.tgz"

rm -rf *.tgz
cd html
mkdir -p "../../deploy_pkgs"
tar czf "../../deploy_pkgs/$tarfileName" *
cd ../

ssh whitehel@whitehelmettech.com 'mkdir -p ~/deploy_pkgs'
scp "../deploy_pkgs/$tarfileName" "whitehel@whitehelmettech.com:~/deploy_pkgs/"

dirDestName="~/public_html/app_${suffix}_${version}"
ssh whitehel@whitehelmettech.com "mkdir -p $dirDestName; rm -rf $dirDestName/*; tar xzf ~/deploy_pkgs/$tarfileName -C $dirDestName"

linkName="~/public_html/app_${suffix}"
ssh whitehel@whitehelmettech.com "rm -rf $linkName; ln -s $dirDestName $linkName"
