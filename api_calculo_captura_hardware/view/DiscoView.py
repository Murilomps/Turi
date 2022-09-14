from prettytable import PrettyTable;
import sys
sys.path.append('..');
from model.Disco import Disco;

class DiscoView:

    @staticmethod
    def exibir_informacao_disco(informacao_disco):
        table_resultado = PrettyTable();
        table_resultado.field_names = ["Total"]
        
        table_resultado.add_row([
            informacao_disco,
        ])

        print('\n\n');
        print(table_resultado);
        print('\n\n');

    @staticmethod
    def exibir_dados_disco(informacoes_disco):
        table_resultado = PrettyTable();
        table_resultado.field_names = ["Total", "Usado", "Porcentagem-usado", "Livre"];
        
        table_resultado.add_row([
            informacoes_disco["total"],  
            informacoes_disco["usado"],
            informacoes_disco["porcentagem_disco_usado"],
            informacoes_disco["livre"],
        ])

        print(table_resultado);
        print('\n\n');

