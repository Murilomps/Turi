/* MYSQL */
CREATE DATABASE Turi;
USE Turi;

CREATE TABLE empresa (
    id int primary key auto_increment,
	nome VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL,
    rua VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    numero INT NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    codigoVerificação VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

INSERT INTO empresa VALUES(null, "Riachuelo", "00.038.166/0002-88","Rua Delurdes", "Vila Sônia", 85, "São Paulo", "241eadww123aw", "1234");

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(100) NOT NULL
)AUTO_INCREMENT=100;
-- manter código da Turi no BD ou somente chapado no código?

CREATE TABLE computador (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
    sistema_operacional VARCHAR(45) NOT NULL,
    disco_total FLOAT NOT NULL,
	cpu_nucleos_logicos INT NOT NULL,
    cpu_nucleos_fisicos INT NOT NULL,
    memoria_total FLOAT NOT NULL
)AUTO_INCREMENT=200;

select * from computador;

CREATE TABLE Leitura (
	id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
    data_hora datetime,
    cpu_porcentagem FLOAT,
    cpu_idle FLOAT,
    memoria_usada FLOAT,
    memoria_disponivel FLOAT,
    memoria_livre FLOAT,
    memoria_ativa FLOAT,
    memoria_inativa FLOAT,
    memoria_buffer FLOAT,
    memoria_cache FLOAT,
    disco_usado FLOAT
);