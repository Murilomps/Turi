class DiscoDao:

    @staticmethod
    def inserir_dados_disco(cursor, dados_disco):
        query = "INSERT INTO disco_dinamico VALUES (null, 200, %s, %s, %s, %s)";
        cursor.execute(
            query, 
            (dados_disco["total"],
             dados_disco["usado"] ,
             dados_disco["porcentagem_disco_usado"],
             dados_disco["livre"])
        );
