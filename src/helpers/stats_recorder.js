import statsHelper from './stats.js';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

class stats_recorder {
  #ept = new Array();
  #currentRun;
  #id = uuidv4();
  
  constructor() {
  }

  add_ept(ept, page) {
    let run = this.#currentRun;
    this.#ept.push({ ept: Math.round(ept), page, run });
  }

  async get_stats_result() {

    let eptStats = new Map();

    for (let i = 0; i < this.#ept.length; i++) {
        if (!eptStats.has(this.#ept[i].page)) {
            eptStats.set(this.#ept[i].page, new Array());
        }

        eptStats.get(this.#ept[i].page).push(this.#ept[i].ept);
    }

    const pageStats = new Array();

    for (let [key, value] of eptStats) {
        const stats = new statsHelper(value);
        const pageStat = {
            page: key,
            count: stats.get_count(),
            sum: stats.get_sum(),
            average: stats.get_average(),
            median: stats.get_median(),
            stdev: stats.get_stdev(),
            min: stats.get_min(),
            max: stats.get_max()
        }

        pageStats.push(pageStat);
    }

    return  { id: this.#id,
              system: {
                type: os.type(),
                release: os.release(),
                platform: os.platform(),
                hostname: os.hostname()
            }, pageStats };
  }

  start_run(run) {
    this.#currentRun = run;
  }

  stop_run() {
    this.#currentRun = null;
  }
}

export default stats_recorder;
