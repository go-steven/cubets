import {LoadIniCfgs} from './inifile';
import {MysqlConn} from './dbconn';

let config = LoadIniCfgs('/var/code/go/config.cfg', 'masterdb');
var DefaultConn  = MysqlConn(config['host'], config['user'], config['passwd'], config['dbname']);
export {DefaultConn};
