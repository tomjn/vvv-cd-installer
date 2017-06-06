var steps = [
  {
    "label": "Installing Git",
    "type": "exec",
    "exec": "IF NOT EXIST git Git-64bit.exe"
  },
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
    "label": "Adding VVV Box",
    "type": "exec",
    "exec": "vagrant box add ubuntu/trusty64 ..\\vvv-contribute.box"
  },
  {
    "label": "Extracting VVV archive",
    "type": "unzip",
    "source": "..\\vvv.zip",
    "target": ".."
  },
  {
    "label": "Starting VVV for the first time",
    "type": "exec",
    "exec": "vagrant up --provider virtualbox"
  }
];

module.exports = steps;