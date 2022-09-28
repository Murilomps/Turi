import time;
from model.Disco import Disco;
from view.DiscoView import DiscoView;
from dao.DiscoDao import DiscoDao;

class DiscoController:

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
            "(1) Total disco\n"+
            "(2) Dados Disco\n"
        );
        resposta_usuario = int(input("Resposta: "));

        if resposta_usuario != 1 and resposta_usuario != 2:
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
        
        tipo_informacao = DiscoController.pergunta_informacao_cpu();
        cls.tipo_informacao = tipo_informacao
        

        if(cls.tipo_informacao != 1):
            quanto_tempo = DiscoController.pergunta_quanto_tempo();
            cls.quanto_tempo = quanto_tempo;
            
            intervalo_tempo = DiscoController.perguntar_intervalo_tempo();
            cls.intervalo_tempo = intervalo_tempo


        if(cls.tipo_informacao != 1):
            enviar_banco = DiscoController.pergunta_enviar_banco();
            cls.enviar_banco = enviar_banco;
        

    def iniciar(self):
        
        try:
            self.perguntar_usuario();
            self.executar_programa();

        except:
            print("\n\nResposta inválida");
    
    def executar_programa(self):
        tempo_segundos = 0;

        if(self.tipo_informacao  == 1):
            return self.view.exibir_informacao_disco(self.model.buscar_capacidade_total());

        conn = self.database.realizar_conexao_banco();
        
        try:
            with conn.cursor() as cursor:
                
                while(tempo_segundos < self.quanto_tempo):
                    
                    print(f"\n{tempo_segundos + 1})")
                    dados = self.model.buscar_dados_disco();
                    self.view.exibir_dados_disco(dados);
                    tempo_segundos += self.intervalo_tempo;
                    if(self.enviar_banco):
                        self.dao.inserir_dados_disco(cursor, dados);
                    
                    conn.commit();
                    time.sleep(self.intervalo_tempo);
            
            conn.close();
        
        except:
            print("Houve um erro ao inserir os dados no banco");
            