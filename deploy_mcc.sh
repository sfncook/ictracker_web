cd ./html
rm -rf my.tgz
tar czf my.tgz *
scp my.tgz whitehel@whitehelmettech.com:~/public_html
ssh whitehel@whitehelmettech.com 'tar xzf ~/public_html/my.tgz -C ~/public_html/app_mcc'

