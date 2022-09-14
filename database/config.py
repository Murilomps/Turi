import pymysql.cursors;
from dotenv import load_dotenv;
import os;
import traceback;

class BancoMySql:

    def __init__(self):
        load_dotenv('./.env');
        
        self.host = os.getenv('HOST');
        self.user = os.getenv('USER-BANCO');
        self.password = os.getenv('PASSWORD');
        self.database = os.getenv('DATABASE');
        self.cursorclass = pymysql.cursors.DictCursor;
        self.conn = '';

    def realizar_conexao_banco(self):
        
        try:
            return pymysql.connect(
                host=self.host,
                user=self.user,
                database=self.database,
                password=self.password,
                cursorclass=self.cursorclass
            )
        except Exception:
            print("Houve um erro na conexão com o banco");
            traceback.print_exc();
            