const CollectorBase = require("./CollectorBase")



class ReactionCollector extends CollectorBase {
    constructor(client, messageC, optionsClass) {
        super()
        this.client = client
        this.message = messageC
        this.time = 0
        this.limit = 0
        this.options = {
            data: optionsClass.data === undefined ? {} : optionsClass.data,
            limit: optionsClass.limit === undefined ? 96000 : optionsClass.limit,
            collectAll: optionsClass.collectAll === undefined ? 0 : optionsClass.collectAll,
            messageID: optionsClass.messageID === undefined ? this.message.id === undefined ? null : this.message.id : optionsClass.messageID,
            userID: optionsClass.userID === undefined ? '' : optionsClass.userID,
            userIF: optionsClass.userID === undefined ? false : true,
            ignoreBot: optionsClass.ignoreBot === undefined ? false : optionsClass.ignoreBot,
            ignoreSystem: optionsClass.ignoreSystem === undefined ? false : optionsClass.ignoreSystem
        }

        this.messageReactionAdd = []
        this.messageReactionRemove = []
        
        
        this.client.on('messageReactionAdd',  (message, emoji, reactor) => {
   
            if (this.options.messageID === message.id) {
                
            } else { return }
       
            if (this.finished === true) {
                return;
            }
       

            if (this.options.ignoreBot) {
                if (reactor.user.bot) {
                    return;
                } 
            }

            if (this.options.ignoreSystem) {
                if (reactor.user.system) {
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
               
                if (reactor.user.id === this.options.userID) {
                    this.messageReactionAdd.push(message, emoji, reactor)
                    this.emit('add', message, emoji, reactor) 
                } else {
                    this.messageReactionAdd.push(message, emoji, reactor)
                    this.emit('add', message, emoji, reactor) 
                }
            
                return;
            }
        })


        
        this.client.on('messageReactionRemove',  (message, emoji, reactor) => {

            if (this.options.messageID === message.id) {
                
            } else { return }
       
            if (this.finished === true) {
                return;
            }
       

            if (this.options.ignoreBot) {
                if (reactor.user.bot) {
                    return;
                } 
            }

            if (this.options.ignoreSystem) {
                if (reactor.user.system) {
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
               
                if (reactor.user.id === this.options.userID) {
                    this.messageReactionRemove.push(message, emoji, reactor)
                    this.emit('remove', message, emoji, reactor) 
                } else {
                    this.messageReactionRemove.push(message, emoji, reactor)
                    this.emit('remove', message, emoji, reactor) 
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



module.exports = ReactionCollector;
