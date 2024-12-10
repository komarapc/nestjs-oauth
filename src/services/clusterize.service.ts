import { Injectable, Logger } from '@nestjs/common';
const cluster = require('cluster');
import * as os from 'os';

const numCpus = os.cpus().length;
@Injectable()
export class AppClusterService {
  private static readonly logger = new Logger(AppClusterService.name);
  static clusterize(cb: Function) {
    if (cluster.isPrimary) {
      this.logger.log(`Primary ${process.pid} is running`);
      for (let i = 0; i < numCpus; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        this.logger.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      cb();
    }
  }
}
