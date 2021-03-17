const EventEmitter = require("events");




/**
 * This is the basis of the Collector to have an expansion of the class that extended by EventEmitter
 */
class CollectorBase extends EventEmitter {
    constructor(time) {
        super();
        this.time = time
        this.finished = false
        this.error = false
        this.timeWork
    }

    stopAll() {
        this.finished = true;
        return {
            capture: this.emit('finish', this.finished, this.error),
            base: this
        }
    }

    stopWork(...args) {
        return {
            capture: this.once('finish', ...args),
            base: this
        }
    }

    createTime(time) {
        try {
            const collector = this
            const emitEvent = this.emit('start', this.finished, this.error, this)
            this.timeWork = setTimeout(function() {
                emitEvent
                collector.stopAll()
            }, time)        
        } catch {
            this.error = true
            this.emit('finish', this.finished, this.error)
        }
        return this;
    }
}



module.exports = CollectorBase;