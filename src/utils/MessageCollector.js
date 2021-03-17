const CollectorBase = require("./CollectorBase");




/**
 * 
 */
class MessageCollector extends CollectorBase {

    constructor(client, channel, optionsClass = {}) {
        super()
        this.client = client
        this.channel = channel
        this.time = 0
        this.limit = 0
        this.options = {
            data: optionsClass.data === undefined ? {} : optionsClass.data,
            limit: optionsClass.limit === undefined ? 0 : optionsClass.limit,
            userID: optionsClass.userID === undefined ? '' : optionsClass.userID,
            userIF: optionsClass.userID === undefined ? false : true,
            ignoreBot: optionsClass.ignoreBot === undefined ? false : optionsClass.ignoreBot,
            ignoreSystem: optionsClass.ignoreSystem === undefined ? false : optionsClass.ignoreSystem
        
        }

        this.messageCreate = []
        this.messageUpdate = []
        this.messageDelete = []


        this.client.on('messageCreate',  (message) => {
        
            if (this.finished === true) {
                return;
            }

            if (this.options.ignoreBot) {
                if (message.author.bot) {
                    return;
                } 
            }
 

            if (this.options.ignoreSystem) {
                if (message.author.system) {
                    return;
                } 
            }
          
            if (this.limit >= this.options.limit) {
                this.stopAll()
                return;
            } else {
                this.limit++
            }
        
            if (this.userIF === true) {
              
            } else {
                if (message.author.id === this.options.userID) {
                    this.messageCreate.push(message)
                    this.emit('captureMessage', message) 
                } else {
                    this.messageCreate.push(message)
                    this.emit('captureMessage', message) 
                }
            
                return;
            }
        })

        

        this.client.on('messageUpdate',  (message) => {
            if (this.finished === true) {
                return;
            }

            if (this.options.ignoreBot) {
                if (message.author.bot) {
                    return;
                } 
            }
 

            if (this.options.ignoreSystem) {
                if (message.author.system) {
                    return;
                } 
            }
          
            if (this.limit >= this.options.limit) {
                this.stopAll()
                return;
            } else {
                this.limit++
            }

            if (this.userIF === true) {
            
            } else {
                if (message.author.id === this.options.userID) { 
                    this.messageUpdate.push(message)
                    this.emit('captureUpdate', message)
                } else {
                    this.messageUpdate.push(message)
                    this.emit('captureUpdate', message)
                }
                return;
            }
        })


        this.client.on('messageDelete',  (message) => {
          
            if (this.finished === true) {
                return;
            }

            if (this.options.ignoreBot) {
                if (message.author.bot) {
                    return;
                } 
            }
 

            if (this.options.ignoreSystem) {
                if (message.author.system) {
                    return;
                } 
            }
          
           if (this.limit >= this.options.limit) {
                this.stopAll()
                return;
            } else {
                this.limit++
            }

            if (this.userIF === true) {
               
            } else {
                if (message.author.id === this.options.userID) { 
                    this.messageDelete.push(message)
                    this.emit('captureDelete', message)
                } else {
                    this.messageDelete.push(message)
                    this.emit('captureDelete', message)
                }
                return;
            }

        })

    }

    setTime(time = 0) {
        if (typeof time === 'number') {} 
            else {
                return TypeError("You need to enter a number for the collector to finish in the future.")
            }
        this.time = time 
        this.createTime(this.time)
        return this;
    }

}


module.exports = MessageCollector;
