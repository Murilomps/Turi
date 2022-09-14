import { blacklist } from './configRedis.js';
import jsonwebtoken from 'jsonwebtoken';
import { createHash } from 'crypto';
import { promisify } from 'util';

const gerarHashToken = token => createHash('sha256').update(token).digest('hex');
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

class Blacklist {

    static adicionarTokenNaBlackList = async token => {

        const dataExpiracaoToken = jsonwebtoken.decode(token).exp;
        const tokenHash = gerarHashToken(token);

        await setAsync(tokenHash, '');
        blacklist.expireat(tokenHash, dataExpiracaoToken);
    }

    static tokenEstaNaBlackList = async token => {
        
        const tokenHash = gerarHashToken(token);

        return await existsAsync(tokenHash);
    }
}

export default Blacklist;