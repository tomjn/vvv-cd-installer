var path = require('path');
var install_path = path.join(process.env.HOME, 'vagrant-local');
var steps = [
  {
    "label": "Creating VVV target folder",
    "type": "exec",
    "exec": "mkdir -p " + install_path
  },
  {
    "label": "Mounting VirtualBox disk",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vbox-img ]]; then hdiutil attach $NODECWDMacOS/virtualbox.dmg; fi"
  },
  {
    "label": "Installing VirtualBox",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vbox-img ]]; then open -W /Volumes/VirtualBox/VirtualBox.pkg; fi"
  },
  {
    "label": "Mounting Vagrant disk",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vagrant ]]; then hdiutil attach $NODECWDMacOS/vagrant.dmg; fi"
  },
  {
    "label": "Installing Vagrant",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vagrant ]]; then open -W /Volumes/Vagrant/vagrant.pkg; fi"
  },
  {
    "label": "Installing Vagrant Hosts Updater Plugin",
    "type": "exec",
    "exec": "/usr/local/bin/vagrant plugin list | grep -q hostsupdater || /usr/local/bin/vagrant plugin install vagrant-hostsupdater"
  },
  {
    "label": "Installing Vagrant Triggers Plugin",
    "type": "exec",
    "exec": "/usr/local/bin/vagrant plugin list | grep -q triggers || /usr/local/bin/vagrant plugin install vagrant-triggers"
  },
  {
    "label": "Adding VVV Box",
    "type": "exec",
    "exec": "if ! /usr/local/bin/vagrant box list | grep -q ubuntu/trusty64; then /usr/local/bin/vagrant box add ubuntu/trusty64 $NODECWDvvv.box; fi"
  },
  {
    "label": "Extracting VVV archive",
    "type": "unzip",
    "test": install_path +"vvv-config.yml",
    "source": "$NODECWDvvv.zip",
    "target": install_path
  },
  {
    "label": "Starting VVV for the first time",
    "type": "exec",
    "exec": "cd '" + install_path+"' && /usr/local/bin/vagrant up --provider virtualbox"
  }
];

module.exports = steps;
