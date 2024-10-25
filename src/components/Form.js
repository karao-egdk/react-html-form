import React, { Component } from "react";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                name: "",
                age: "",
                mobile: "",
                email: "",
                hasSecondary: false,
                secondaryMobile: "",
                gender: "",
                favTechnology: "html",
            },
            isValidFormItems: {
                name: true,
                age: true,
                mobile: true,
                email: true,
                secondaryRadio: false,
                secondaryMobile: true,
                gender: true,
            },
        };
    }

    patterns = {
        nameRegex: /^[a-z]+$/i,
        emailRegex: /^[\w\-\.]+@([\w]+\.)[\w]{2,5}(\.[\w]{2,5})*$/,
        phoneNoRegex: /^\d{10}$/,
    };

    handleChangeInput = (event) => {
        const key = event.target.name;
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [key]: event.target.value,
            },
        });
    };

    handleChangeRadioSecondaryPhone = (event) => {
        this.setState({
            ...this.state,
            isValidFormItems: {
                ...this.state.isValidFormItems,
                secondaryRadio: event.target.value === "yes" ? true : false,
            },
        });
    };

    handleChangeRadioGender = (event) => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                gender: event.target.value,
            },
        });
    };

    // Validation for each input
    isNameValid = () => {
        const isValid = this.patterns.nameRegex.test(this.state.formData.name);
        this.setState((prev) => {
            return {
                ...prev,
                isValidFormItems: {
                    ...prev.isValidFormItems,
                    name: isValid,
                },
            };
        });

        return isValid;
    };

    isAgeValid = () => {
        const isValid =
            parseInt(this.state.formData.age) > 0 &&
            parseInt(this.state.formData.age) < 101;

        this.setState((prev) => {
            return {
                ...prev,
                isValidFormItems: {
                    ...prev.isValidFormItems,
                    age: isValid,
                },
            };
        });

        return isValid;
    };

    isMobileValid = () => {
        const isValid = this.patterns.phoneNoRegex.test(
            this.state.formData.mobile
        );

        this.setState((prev) => {
            return {
                ...prev,
                isValidFormItems: {
                    ...prev.isValidFormItems,
                    mobile: isValid,
                },
            };
        });

        return isValid;
    };

    isEmailValid = () => {
        const isValid = this.patterns.emailRegex.test(
            this.state.formData.email
        );

        this.setState((prev) => {
            return {
                ...prev,
                isValidFormItems: {
                    ...prev.isValidFormItems,
                    email: isValid,
                },
            };
        });

        return isValid;
    };

    isSecondaryPhoneValid = () => {
        if (!this.state.isValidFormItems.secondaryRadio) return true;
        const isValid = this.patterns.phoneNoRegex.test(
            this.state.formData.secondaryMobile
        );

        this.setState((prev) => {
            return {
                ...prev,
                isValidFormItems: {
                    ...prev.isValidFormItems,
                    secondaryMobile: isValid,
                },
            };
        });

        return isValid;
    };

    isGenderSelected = () => {
        const isValid = this.state.formData.gender !== "";

        this.setState((prev) => {
            return {
                ...prev,
                isValidFormItems: {
                    ...prev.isValidFormItems,
                    gender: isValid,
                },
            };
        });
    };

    isValidForm = () => {
        let isValid = true;
        if (!this.isNameValid()) isValid = false;
        if (!this.isAgeValid()) isValid = false;
        if (!this.isMobileValid()) isValid = false;
        if (!this.isEmailValid()) isValid = false;
        if (!this.isSecondaryPhoneValid()) isValid = false;
        if (!this.isGenderSelected()) isValid = false;
        return isValid;
    };

    addToLocalStorage = () => {
        localStorage.setItem("form-data", JSON.stringify(this.state.formData));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.isValidForm()) return;

        this.addToLocalStorage();
        alert("Form saved successfully");
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Form</h1>
                <div className="name-age-container">
                    <div className="name-container">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter name"
                            value={this.state.formData.name}
                            onChange={(e) => {this.handleChangeInput(e)}}
                        />
                        {!this.state.isValidFormItems.name && (
                            <p className="error" id="error-name">
                                Name is invalid
                            </p>
                        )}
                    </div>
                    <div className="age-container">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="Enter Age"
                            value={this.state.formData.age}
                            onChange={(e) => this.handleChangeInput(e)}
                        />
                        {!this.state.isValidFormItems.age && (
                            <p className="error" id="error-age">
                                Age cannot be empty
                            </p>
                        )}
                    </div>
                </div>

                <div className="mobile-email-container">
                    <div className="mobile-container">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            placeholder="Enter Mobile number"
                            value={this.state.formData.mobile}
                            onChange={(e) => this.handleChangeInput(e)}
                        />
                        {!this.state.isValidFormItems.mobile && (
                            <p className="error" id="error-mobile">
                                Enter valid Mobile number
                            </p>
                        )}
                    </div>
                    <div className="email-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter Email"
                            value={this.state.formData.email}
                            onChange={(e) => this.handleChangeInput(e)}
                        />
                        {!this.state.isValidFormItems.email && (
                            <p className="error" id="error-email">
                                Enter valid Email
                            </p>
                        )}
                    </div>
                </div>

                <div className="secondary-phone-radio-container">
                    <div className="secondary-radio-container">
                        <p>Has Secondary phone ?</p>
                        <input
                            type="radio"
                            name="hasSecondary"
                            id="yes"
                            value="yes"
                            onChange={(e) =>
                                this.handleChangeRadioSecondaryPhone(e)
                            }
                        />
                        <label htmlFor="yes">Yes</label>
                        <input
                            type="radio"
                            name="hasSecondary"
                            id="no"
                            value="no"
                            onChange={(e) =>
                                this.handleChangeRadioSecondaryPhone(e)
                            }
                            defaultChecked
                        />
                        <label htmlFor="no">No</label>
                    </div>
                    {this.state.isValidFormItems.secondaryRadio && (
                        <div className="secondary-phone-container">
                            <label htmlFor="secondary-mobile">Mobile</label>
                            <input
                                type="number"
                                name="secondaryMobile"
                                id="secondary-mobile"
                                placeholder="Enter Secondary Number"
                                value={this.state.formData.secondaryMobile}
                                onChange={(e) => this.handleChangeInput(e)}
                            />
                            {!this.state.isValidFormItems.secondaryMobile && (
                                <p
                                    className="error"
                                    id="error-secondary-mobile"
                                >
                                    Enter valid Mobile number
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="gender-container">
                    <p>Gender</p>
                    <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={(e) => this.handleChangeRadioGender(e)}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={(e) => this.handleChangeRadioGender(e)}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        onChange={(e) => this.handleChangeRadioGender(e)}
                    />
                    <label htmlFor="other">Other</label>
                    {!this.state.isValidFormItems.gender && (
                        <p className="error" id="error-gender">
                            Select a Gender
                        </p>
                    )}
                </div>

                <div className="fav-technology-container">
                    <label htmlFor="fav-technology">Fav Technology:</label>
                    <select
                        name="favTechnology"
                        id="fav-technology"
                        value={this.state.formData.favTechnology}
                        onChange={(e) => this.handleChangeInput(e)}
                    >
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">Javascript</option>
                        <option value="react">React</option>
                    </select>
                </div>
                <button className="submit-button" type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;
