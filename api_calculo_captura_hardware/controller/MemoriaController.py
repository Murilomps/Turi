import time;
from model.Memoria import Memoria;
from view.MemoriaView import MemoriaView;
from dao.MemoriaDao import MemoriaDao;

class MemoriaController:

    tipo_informacao = '';
    quanto_tempo = 0;
    intervalo_tempo = 0;
    enviar_banco = ''

    def __init__(self, model, view, database, dao):
        self.model = model;
        self.view = view;
        self.database = database
        self.dao = dao;
        

    @staticmethod
    def pergunta_informacao_cpu():
        
        print("\n\nDigite o número do que deseja acessar\n");
        print(
            "(1) Especificações Memória e Swap\n"+
            "(2) Dados Memória\n"+
            "(3) Dados Swap\n"
        );
        resposta_usuario = int(input("Resposta: "));

        if resposta_usuario != 1 and resposta_usuario != 2 and resposta_usuario != 3:
            raise Exception;
        
        return resposta_usuario;

    @staticmethod
    def pergunta_quanto_tempo():
        print("\n\nQuanto tempo (segundos):");
        return int(input("Resposta: "));

    @staticmethod
    def perguntar_intervalo_tempo():
        print("\n\nQuer exibir as informações de quanto em quanto tempo?: ");
        return int(input("Resposta: "));

    @staticmethod
    def pergunta_enviar_banco():
        print("\n\nDeseja enviar para o banco? S/n");
        resposta_usuario = input("Resposta: ").lower();
        
        if resposta_usuario != 's' and resposta_usuario != 'n':
            raise Exception;
        
        if resposta_usuario == 's':
            return True;
        
        else:
            return False;
        
    @classmethod
    def perguntar_usuario(cls):
        
        tipo_informacao = MemoriaController.pergunta_informacao_cpu();
        cls.tipo_informacao = tipo_informacao
        

        if(cls.tipo_informacao != 1):
            quanto_tempo = MemoriaController.pergunta_quanto_tempo();
            cls.quanto_tempo = quanto_tempo;
            
            intervalo_tempo = MemoriaController.perguntar_intervalo_tempo();
            cls.intervalo_tempo = intervalo_tempo


        if(cls.tipo_informacao != 1):
            enviar_banco = MemoriaController.pergunta_enviar_banco();
            cls.enviar_banco = enviar_banco;
        

    def iniciar(self):
        
        try:
            self.perguntar_usuario();
            self.executar_programa();

        except:
            print("\n\nResposta inválida");
    
    def associar_index_com_informacao(self):
        lista_informacoes = [
            self.model.buscar_dados_memoria(),
            self.model.buscar_dados_swap()
        ]

        lista_view = [
            self.view.exibir_dados_memoria,
            self.view.exibir_dados_swap
        ]

        index_informacao = self.tipo_informacao - 2;

        lista_view[index_informacao](lista_informacoes[index_informacao]);
        return lista_informacoes[index_informacao];
    
    def executar_programa(self):
        tempo_segundos = 0;

        if(self.tipo_informacao  == 1):
            return self.view.exibir_informacoes_memoria(self.model.buscar_informacoes_memoria());

        conn = self.database.realizar_conexao_banco();
        
        try:
            with conn.cursor() as cursor:
                
                while(tempo_segundos < self.quanto_tempo):
                    
                    print(f"\n{tempo_segundos + 1})")
                    dados = self.associar_index_com_informacao();
                    tempo_segundos += self.intervalo_tempo;
                    if(self.enviar_banco):
                        lista_dao = [
                            self.dao.inserir_dados_memoria,
                            self.dao.inserir_dados_swap
                        ]
                        lista_dao[self.tipo_informacao - 2](cursor, dados);   
                    
                    conn.commit();
                    time.sleep(self.intervalo_tempo);
            
            conn.close();
        
        except:
            print("Houve um erro ao inserir os dados no banco");