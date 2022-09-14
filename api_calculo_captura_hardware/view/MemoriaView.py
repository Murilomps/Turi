from prettytable import PrettyTable;
import sys;
sys.path.append('..');
from model.Memoria import Memoria;

class MemoriaView:

    @staticmethod
    def exibir_informacoes_memoria(informacoes_memoria):
        
        tabela_memoria = PrettyTable(); 
        tabela_memoria.field_names = ["Memória-total", "Swap-total"];
        tabela_memoria.add_row([
            informacoes_memoria["memoria_total"],
            informacoes_memoria["swap_total"]
        ])

        print('\n\n');
        print(tabela_memoria);
        print('\n\n');

    @staticmethod
    def exibir_dados_memoria(dados_memoria):
    
        tabela_memoria = PrettyTable(); 
        tabela_memoria.field_names = ["Total", "Usada", "Porcentagem-usada", "Livre", "Ativa", "Inativa", "Buffer", "Compartilhada"];
        tabela_memoria.add_row([
            dados_memoria["memoria_total"],
            dados_memoria["memoria_usada"],
            dados_memoria["porcentagem_memoria_usada"],
            dados_memoria["memoria_livre"], 
            dados_memoria["memoria_ativa"],
            dados_memoria["memoria_inativa"],
            dados_memoria["memoria_buffer"], 
            dados_memoria["memoria_compartilhada"]
        ])

        print(tabela_memoria);
        print('\n\n');

    @staticmethod
    def exibir_dados_swap(dados_swap):
        tabela_swap = PrettyTable(); 
        tabela_swap.field_names = ["Total", "Usada", "Porcentagem-usada", "Livre"]
        tabela_swap.add_row([
            dados_swap["swap_total"],
            dados_swap["swap_usada"],
            f'{dados_swap["porcentagem_swap_usada"]}%',
            dados_swap["swap_livre"] 
        ])

        print(tabela_swap);        
        print('\n\n');
