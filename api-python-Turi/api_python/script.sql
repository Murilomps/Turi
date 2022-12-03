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
    senha VARCHAR(45) NOT NULL
);

INSERT INTO empresa VALUES(null, "Riachuelo", "00.038.166/0002-88","Rua Delurdes", "Vila Sônia", 85, "São Paulo", "1234");

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(100) NOT NULL
)AUTO_INCREMENT=100;


CREATE TABLE computador (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
	memoria_total FLOAT,
    disco_total FLOAT,
    sistema_operacional VARCHAR(45),
	cpu_nucleos_logicos INT,
    cpu_nucleos_fisicos INT,
	endereco_mac CHAR(12)
);

CREATE TABLE leitura (
	id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
    data_hora datetime,
    cpu_porcentagem FLOAT,
	disco_usado FLOAT,
    memoria_usada FLOAT,
    memoria_disponivel FLOAT
);

CREATE TABLE alerta (
    id int primary key auto_increment,
    fk_leitura int not null,
    foreign key (fk_computador) references computador(id),
    componente varchar(50)
);

// AZURE

CREATE TABLE empresa (
    id int primary key IDENTITY,
	nome VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL,
    rua VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    numero INT NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

CREATE TABLE usuario (
    id INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE computador (
	id INT PRIMARY KEY IDENTITY,
	fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
	memoria_total FLOAT,
    disco_total FLOAT,
    sistema_operacional VARCHAR(45),
	cpu_nucleos_logicos INT,
    cpu_nucleos_fisicos INT,
	endereco_mac CHAR(12)
);


CREATE TABLE leitura (
	id INT PRIMARY KEY IDENTITY,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
    data_hora datetime,
    cpu_porcentagem FLOAT,
	disco_usado FLOAT,
    memoria_usada FLOAT,
    memoria_disponivel FLOAT
);

CREATE TABLE alerta (
    id int primary key IDENTITY,
    fk_leitura int not null,
    foreign key (fk_leitura) references leitura(id),
    componente varchar(50),
    
);