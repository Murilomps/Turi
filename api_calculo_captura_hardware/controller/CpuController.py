import time;
from model.Cpu import Cpu;
from view.CpuView import CpuView;
from dao.CpuDao import CpuDao;

class CpuController:

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
            "(1) Especificações cpu\n"+
            "(2) Dados cpu média\n"+
            "(3) Dados cpu núcleos\n"
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
        
        tipo_informacao = CpuController.pergunta_informacao_cpu();
        cls.tipo_informacao = tipo_informacao
        

        if(cls.tipo_informacao != 1):
            quanto_tempo = CpuController.pergunta_quanto_tempo();
            cls.quanto_tempo = quanto_tempo;
            
            intervalo_tempo = CpuController.perguntar_intervalo_tempo();
            cls.intervalo_tempo = intervalo_tempo


        if(cls.tipo_informacao == 2):
            enviar_banco = CpuController.pergunta_enviar_banco();
            cls.enviar_banco = enviar_banco;
        

    def iniciar(self):
        
        try:
            self.perguntar_usuario();
            self.executar_programa();

        except:
            print("\n\nResposta inválida");


    def associar_index_com_informacao(self):
        lista_informacoes = [
            self.model.buscar_dados_media(),
            self.model.buscar_dados_nucleos()
        ]

        lista_view = [
            self.view.exibir_media_cpu,
            self.view.exibir_nucleos_cpu
        ]

        index_informacao = self.tipo_informacao - 2;

        lista_view[index_informacao](lista_informacoes[index_informacao]);
        return lista_informacoes[index_informacao];

    def executar_programa(self):
        tempo_segundos = 0;

        if(self.tipo_informacao  == 1):
            return self.view.exibir_informacoes_cpu(self.model.buscar_informacoes());

        conn = self.database.realizar_conexao_banco();
        
        try:
            with conn.cursor() as cursor:
                
                while(tempo_segundos < self.quanto_tempo):
                    
                    print(f"\n{tempo_segundos + 1})")
                    dados = self.associar_index_com_informacao();
                    tempo_segundos += self.intervalo_tempo;
                    if(self.enviar_banco):
                        self.dao.inserir_media_cpu(cursor, dados);
                    time.sleep(self.intervalo_tempo);
            
            conn.commit();
            conn.close();
        
        except:
            print("Houve um erro ao inserir os dados no banco");