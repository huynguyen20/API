#! /bin/sh
#
# getstats.sh - Collect diagnostic information about OpenWrt.
# Write the data to a file (usually /tmp/openwrtstats.txt)
#
# ***** To install and run this script *****
#
# SSH into your router and execute these statements.
#
# ssh root@192.168.1.1
# cd /tmp
# cat > getstats.sh
# [paste in the contents of this file, then hit ^D]
# sh getstats.sh
# You should see the results listed on-screen
#
# License: GPL Copyright (c) 2013-2016 Rich Brown
#
# Based on Sebastian Moeller's original from:
# https://lists.bufferbloat.net/pipermail/cerowrt-devel/2014-April/002871.html

# File that will receive command results
MAC=$(cat /sys/class/net/br-lan/address)
out_fqn=/tmp/$MAC.output.txt

# ------- display_command() -------
# Format the command results into the output file
# Redirect both standard out and error out to that file.

display_command() {
	echo "[ $1 ]"  >> $out_fqn
	eval "$1"      >> $out_fqn 2>> $out_fqn
	echo -e "\n"   >> $out_fqn
}

# ------- Main Routine -------

# Examine first argument to see if they're asking for help
if [ "$1" == "-h" ] || [ "$1" == "--help" ]
then
	echo 'Usage: sh $0 "command 1 to be executed" "command 2" "command 3" ... '
	echo ' '
	exit
fi


# Write a heading for the file

echo "===== $0 at `date` =====" > $out_fqn


# Display the standard set of commands
# These are read from the list delimited by "EOF"

while read LINE; do
    display_command "$LINE"
done << EOF
cat /etc/banner
date
cat /etc/openwrt_release
uname -a
uptime
du -sh / ; du -sh /*
ifconfig
logread
dmesg
EOF


# Extract arguments from the command line and display them.
while [ $# -gt 0 ]
do
	display_command "$1"
	shift 1
done


# End the report
echo "===== end of $0 =====" >> $out_fqn


#cat $out_fqn
echo "Done... Stats written to $out_fqn"
echo " "

scp -i dropbear $out_fqn ubuntu@10.71.5.100:/home/ubuntu/log/.
# Now press Ctl-D, then type "sh getstats.sh"
