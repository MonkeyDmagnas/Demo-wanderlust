Vagrant.configure("2") do |config|
config.vm.define "kube_master_1" do |vm1|
vm1.vm.box = "ubuntu/jammy64"
vm1.vm.network "private_network", ip: "192.168.56.20", name: "vboxnet0"
vm1.vm.provider "virtualbox" do |vm1_prov|
vm1.vm.hostname = "k8master.node"
vm1_prov.gui = false
vm1_prov.memory = 2048
vm1_prov.cpus = 2
vm1_prov.name = "ubu_master_node"
end
# vm1.vm.provision "shell", path: "setup.sh"
end
config.vm.define "kube_worker_1" do |vm2|
vm2.vm.box = "ubuntu/jammy64"
vm2.vm.hostname = "k8worker.node"
vm2.vm.network "private_network", ip: "192.168.56.21", name: "vboxnet0"
vm2.vm.provider "virtualbox" do |vm2_prov|
vm2_prov.gui = false
vm2_prov.memory = 2048
vm2_prov.cpus = 1
vm2_prov.name = "ubu_worker_node"
end
# vm2.vm.provision "shell", path: "setup.sh"
end
end
