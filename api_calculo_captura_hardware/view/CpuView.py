from prettytable import PrettyTable;

class CpuView:
    
    @staticmethod
    def exibir_informacoes_cpu(informacoes_cpu):
        
        table_resultado = PrettyTable();
        table_resultado.field_names = ["Núcleos-Lógicos", "Núcleos-Físicos", "Frequência-Máxima"]
        
        table_resultado.add_row([
            informacoes_cpu["nucleos_logicos"],
            informacoes_cpu["nucleos_fisicos"],
            informacoes_cpu["freq_maxima"],
        ])

        print('\n\n');
        print(table_resultado);
        print('\n\n');


    @staticmethod
    def exibir_nucleos_cpu(dados_nucleos_cpu):

        dados_cpu = dados_nucleos_cpu;
        table_resultado = PrettyTable();
        table_resultado.field_names = ["Nucleo", "Usuario", "Sistema", "Cpu-ociosa", "Procedimentos-adiados(%)", "Frequencia-Atual(Mhz)"];

        for dado in dados_cpu:
            index=dados_cpu.index(dado);
            table_resultado.add_row(
                [ (index+1),
                  (dado["user"]),
                  (dado["system"]),
                  (dado["idle"]),
                  (f'{dado["iowait"]}%'),
                  (f'{dado["freq"]}(Mhz)')
                ]
            )
        
        print(table_resultado);
        print('\n\n');


    @staticmethod
    def exibir_media_cpu(dados_media_cpu):
            
        dados_cpu = dados_media_cpu;
        table_resultado = PrettyTable();
        table_resultado.field_names = ["Usuario", "Sistema", "Cpu-ociosa", "Procedimentos-adiados(%)", "Frequencia-Atual(Mhz)"];
        
        table_resultado.add_row([
            dados_cpu["user"],
            dados_cpu["system"],
            dados_cpu["idle"],
            dados_cpu["iowait"],
            dados_cpu["freq"]
            
        ])
           
        print(table_resultado);
        print('\n\n');