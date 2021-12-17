import React, { Component, Fragment } from "react";
import "./Home.css";
import queryString from "query-string";
import CredentialTable from "../vendors/CredentialTable";
import axios from "axios"

class ValidatableCredential {
    constructor(credential, status = undefined, errorMessage = "") {
        this.credential = credential;
        this.status = status;
        this.errorMessage = errorMessage;
    }
}

class Home extends Component {
    constructor(props) {
        super(props);

        const { processToken } = queryString.parse(this.props.location.search);

        this.state = {
            isLoading: true,
            isDeleteModalShown: false,
            areCredentialDetailsShown: false,
            credentials: [],
            did: null,
            verifiableCredentials: [],
            verifiablePresentationModalCredential: undefined,
            credentialShareRequestToken: processToken || undefined,
            credentialShareRequestModalToken: processToken || undefined,
        };
    }

    makeVerifiableCredentials(credentials) {
        return credentials.map(
            (credential) => new ValidatableCredential(credential)
        );
    }

    async componentDidMount() {
        try {
            console.log("component did mount");
            // const { did, credentials } =
            //     await window.sdk.getDidAndCredentials();

            // const verifiableCredentials =
            //     this.makeVerifiableCredentials(credentials);
            axios.get("http://hichain.bawfen.com/credentials").then((resp) => {
                const verifiableCredentials = resp.data
                const credentials = resp.data
                this.setState({ verifiableCredentials, credentials })
                this.props.userHasAuthenticated(true);
                this.setState({ isLoading: false })
            })
            // this.setState({ did, credentials, verifiableCredentials });
        } catch (error) {
            this.props.userHasAuthenticated(false);
            this.props.history.push("/login");
        }
    }

    render() {
        const { verifiableCredentials, isLoading } = this.state;
        const haveCredentials =
            verifiableCredentials && verifiableCredentials.length > 0;
        const { isAuthenticated } = this.props;

        return (
            <Fragment>
                <div className="Home">
                    <form className="Form container">
                        <h1 className="Title">Verifiable Credentials</h1>
                        {!isLoading ?
                            <div>{isAuthenticated && haveCredentials ? (
                                <div className="Credentials">
                                    <CredentialTable
                                        credentials={verifiableCredentials}
                                    />
                                </div>
                            ) : (
                                <p>You have no credentials.</p>
                            )}</div> :
                            <p>Loading...</p>
                        }
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Home;
