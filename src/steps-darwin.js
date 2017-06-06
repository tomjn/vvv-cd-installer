var steps = [
  {
    "label": "Mounting VirtualBox disk",
    "type": "exec",
    "exec": "if ! hash vbox-img 2>/dev/null; then hdiutil attach MacOS/virtualbox.dmg; fi"
  },
  {
    "label": "Installing VirtualBox",
    "type": "exec",
    "exec": "if ! hash vbox-img 2>/dev/null; then open -W /Volumes/VirtualBox/VirtualBox.pkg; fi"
  },
  {
    "label": "Mounting Vagrant disk",
    "type": "exec",
    "exec": "if ! hash vagrant 2>/dev/null; then hdiutil attach MacOS/vagrant.dmg; fi"
  },
  {
    "label": "Installing Vagrant",
    "type": "exec",
    "exec": "if ! hash vagrant 2>/dev/null; then open -W /Volumes/Vagrant/vagrant.pkg; fi"
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
    "source": "vvv.zip",
    "target": "."
  },
  {
    "label": "Adding VVV Box",
    "type": "exec",
    "exec": "vagrant box add ubuntu/trusty64 vvv-contribute.box"
  },
  {
    "label": "Starting VVV for the first time",
    "type": "exec",
    "exec": "vagrant up --provider virtualbox"
  }
];

module.exports = steps;