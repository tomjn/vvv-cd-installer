var path = require('path');
var install_path = path.join(process.env.USERPROFILE, 'vagrant-local');

var steps = [
  {
    "label": "Installing VirtualBox",
    "type": "exec",
    "exec": "IF NOT EXIST vbox-img VirtualBox.exe"
  },
  {
    "label": "Installing Vagrant",
    "type": "exec",
    "exec": "Vagrant.msi"
  },
  {
    "label": "Installing Vagrant Hosts Updater Plugin",
    "type": "exec",
    "exec": "vagrant plugin install vagrant-hostsupdater"
  },
  {
    "label": "Installing Vagrant Triggers Plugin",
    "type": "exec",
    "exec": "vagrant plugin install vagrant-triggers"
  },
  {
    "label": "Extracting VVV archive",
    "type": "unzip",
    "test": "vvv-config.yml",
    "source": "..\\vvv.zip",
    "target": install_path
  },
  {
    "label": "Adding VVV Box",
    "type": "exec",
    "exec": "vagrant box list | findstr "ubuntu/trusty64" 1>nul || vagrant add box ubuntu/trusty64 ..\\vvv.box"
  },
  {
    "label": "Starting VVV for the first time",
    "type": "exec",
    "exec": "vagrant up --provider virtualbox"
  }
];

module.exports = steps;
