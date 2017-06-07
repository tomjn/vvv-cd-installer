var steps = [
  {
    "label": "Mounting VirtualBox disk",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vbox-img ]]; then hdiutil attach MacOS/virtualbox.dmg; fi"
  },
  {
    "label": "Installing VirtualBox",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vbox-img ]]; then open -W /Volumes/VirtualBox/VirtualBox.pkg; fi"
  },
  {
    "label": "Mounting Vagrant disk",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vagrant ]]; then hdiutil attach MacOS/vagrant.dmg; fi"
  },
  {
    "label": "Installing Vagrant",
    "type": "exec",
    "exec": "if [[ ! -f /usr/local/bin/vagrant ]]; then open -W /Volumes/Vagrant/vagrant.pkg; fi"
  },
  {
    "label": "Installing Vagrant Hosts Updater Plugin",
    "type": "exec",
    "exec": "/usr/local/bin/vagrant plugin install vagrant-hostsupdater"
  },
  {
    "label": "Installing Vagrant Triggers Plugin",
    "type": "exec",
    "exec": "/usr/local/bin/vagrant plugin install vagrant-triggers"
  },
  {
    "label": "Extracting VVV archive",
    "type": "unzip",
    "test": "vvv-config.yml",
    "source": "vvv.zip",
    "target": "."
  },
  {
    "label": "Adding VVV Box",
    "type": "exec",
    "exec": "/usr/local/bin/vagrant box add ubuntu/trusty64 vvv-contribute.box"
  },
  {
    "label": "Starting VVV for the first time",
    "type": "exec",
    "exec": "/usr/local/bin/vagrant up --provider virtualbox"
  }
];

module.exports = steps;