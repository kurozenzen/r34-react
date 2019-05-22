import api from "../api/api";

export default class TagManager {
    constructor(app) {
        this.active = []
        this.suggestions= []
        this.app = app
    }

    getSuggestions(term) {
        api.getTags(term + "*")
            .then(result => {
                this.suggestions = result
                this.app.setState(this.app.state)
            })
    }

    toggle(tagName) {
        
    }
}