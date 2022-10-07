CREATE DATABASE SiteFantoches;

USE SiteFantoches;

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50) UNIQUE,
	senha VARCHAR(50)
);

CREATE TABLE Sorteio (
	idSorteio INT PRIMARY KEY AUTO_INCREMENT,
	boneco VARCHAR(40)
);

CREATE TABLE Voto (
	idVoto INT PRIMARY KEY AUTO_INCREMENT,
	olho VARCHAR(20),
	boca VARCHAR(20),
	anatomia VARCHAR(20),
	cor VARCHAR(20),
	fkUsuario INT,
	fkSorteio INT,
	FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkSorteio) REFERENCES Sorteio(idSorteio)
);

INSERT INTO Voto (olho, boca, anatomia, cor, fkUsuario) VALUES 
('Esbugalhado', 'Acoplado', 'Básico', 'Original', null),
('Esférico', 'Acoplado', 'Com braços', 'Verde', null),
('Esférico', 'Bico', 'Corpo completo', 'Verde', null);

INSERT INTO Sorteio (boneco) VALUES ('Louro João'), ('Ed Sheeran'), ('Tunico'), ('Alf'), ('Billy');