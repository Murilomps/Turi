from prettytable import PrettyTable;


class HardwareView:

 
    @staticmethod
    def exibir_dados_hardware(dados):
        
        tabela_cpu = HardwareView.obter_tabela_cpu(dados); 
        tabela_memoria = HardwareView.obter_tabela_memoria(dados);
        tabela_swap = HardwareView.obter_tabela_swap(dados);
        tabela_disco = HardwareView.obter_tabela_disco(dados);

        print("\nCpu:");
        print(tabela_cpu);
        
        print("\nMemoria:");
        print(tabela_memoria);

        print("\nSwap:");
        print(tabela_swap);

        print("\nDisco:")
        print(tabela_disco);

    @staticmethod
    def obter_tabela_cpu(dados):
        
        tabela_cpu = PrettyTable();

        tabela_cpu.field_names = [
            "Computador",
            "Usuario", 
            "Sistema", 
            "Ociosa", 
            "Procedimentos-adiados", 
            "Frequencia-Atual(Mhz)",
        ];

        for i in dados:
            tabela_cpu.add_row([
                
                dados.index(i),
                i["user"],
                i["system"],
                i["idle"],
                i["iowait"],
                i["freq"]
            ])

        return tabela_cpu;

    @staticmethod
    def obter_tabela_memoria(dados):
        
        tabela_memoria = PrettyTable();
        
        tabela_memoria.field_names = [
            "Computador",
            "Total",
            "Usada",
            "Porcentagem-usada",
            "Livre",
            "Ativa",
            "Inativa",
            "Buffer",
            "Compartilhada",
        ];
        
        for i in dados:
            tabela_memoria.add_row([

                dados.index(i),
                i["memoria_total"],
                i["memoria_usada"],
                i["porcentagem_memoria_usada"],
                i["memoria_livre"],
                i["memoria_ativa"],
                i["memoria_inativa"],
                i["memoria_buffer"],
                i["memoria_compartilhada"]
            ])

        return tabela_memoria;
    
    @staticmethod
    def obter_tabela_swap(dados):
        
        tabela_swap = PrettyTable();

        tabela_swap.field_names = [
            "Computador",
            "Total", 
            "Usada", 
            "Porcentagem-usada", 
            "Livre", 
        ];

        for i in dados:

            tabela_swap.add_row([
                dados.index(i),
                i["swap_total"],
                i["swap_usada"],
                i["porcentagem_swap_usada"],
                i["swap_livre"]
            ])

        return tabela_swap

    @staticmethod
    def obter_tabela_disco(dados):
        
        tabela_disco = PrettyTable();
        
        tabela_disco.field_names = [
            "Computador",
            "Total",
            "Usada",
            "Porcentagem-usado",
            "Livre"
        ];

        for i in dados:
            tabela_disco.add_row([
               
                dados.index(i),
                i["total"],
                i["usado"],
                i["porcentagem_disco_usado"],
                i["livre"]
            ]);

        return tabela_disco;