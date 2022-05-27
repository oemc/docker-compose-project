import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
`;

const Card = styled.div`
    background-color: #858585;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
`;

const Column = styled.div`
    display:flex;
    flex-direction: column;
`;

const Row = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            cacheList: [],
            databaseList: []
        };
        this.userInputHandleChange = this.userInputHandleChange.bind(this);
        this.passwordInputHandleChange = this.passwordInputHandleChange.bind(this);
        this.saveToCache = this.saveToCache.bind(this);
        this.saveToDatabase = this.saveToDatabase.bind(this);
        this.getFromCache = this.getFromCache.bind(this);
        this.getFromDatabase = this.getFromDatabase.bind(this);
        this.isFormComplete = this.isFormComplete.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {  
        this.getFromDatabase();
        this.getFromCache();
    }

    isFormComplete() {
        return this.state.user !== "" && this.state.password !== "";
    }REDIS

    userInputHandleChange(event) {
        this.setState({user: event.target.value});
    }

    passwordInputHandleChange(event) {
        this.setState({password: event.target.value});
    }

    async getFromCache() {
        fetch(`/api/cache`, {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => this.setState({cacheList: data}));
    }

    async getFromDatabase() {
        fetch(`/api/database`, {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => this.setState({databaseList: data}));
    }

    async saveToCache() {
        fetch(`/api/cache`, {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'user': this.state.user,
                'password': this.state.password
            })})
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ user:"", password:"" })
                this.getFromDatabase();
                this.getFromCache();
            })
            .catch(error => {
                alert("No se pudo guardar");
                console.log(error);
            });
    }
    
    async saveToDatabase() {
        fetch(`/api/database`, {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'user': this.state.user,
                'password': this.state.password
            })})
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ user:"", password:"" })
                this.getFromDatabase();
                this.getFromCache();
            })
            .catch(error => {
                alert("No se pudo guardar");
                console.log(error);
            });
    }

    renderList(userlist){
        if (userlist == null){
            return null;
        }
        return(
            userlist.map((u, i) => {
                return(
                    <Card key={i}>
                        <h3>
                            User: {u.user}
                        </h3>
                        <h4>
                            Password: {u.password}
                        </h4>
                    </Card>
                );
            })
        );
    }

    render() {
        let cacheUsers = this.renderList(this.state.cacheList);
        let databaseUsers = this.renderList(this.state.databaseList);
        return (
            <Column>
                <Column>
                    <Row>
                        <Card>
                            <label>
                                Usuario
                                <input type="text" value={this.state.user} onChange={this.userInputHandleChange}/>
                            </label>
                        </Card>
                        <Card>
                            <label>
                                Password
                                <input type="password" value={this.state.password} onChange={this.passwordInputHandleChange}/>
                            </label>
                        </Card>
                    </Row>
                    <Button onClick={this.saveToCache}>Save to Cache</Button>
                    <Button onClick={this.saveToDatabase}>Save to Database</Button>
                </Column>
                <Row>
                    <Column>
                        <h1>Cache users</h1>
                        {cacheUsers}
                    </Column>
                    <Column>
                        <h1>Database users</h1>
                        {databaseUsers}
                    </Column>                    
                </Row>
            </Column>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserForm/>);