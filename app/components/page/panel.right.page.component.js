let Input = (props) => {
    return (
        <label><span>{props.field}: </span>
            <input
                type="text"
                className="form-control pageSettingX2"
                value={props.inputValue}
                onChange={(e) => {
                    let value = e.target.value;
                    props.edit(props.field, value);
                }} />
        </label>)
};

let Checkbox = (props) => {
    return (
        <label htmlFor={props.field} >
            <input type="checkbox"
                id={props.field}
                value={props.inputValue ? 'on' : 'off'}
                onChange={(e) => {
                    let v = e.target.checked;
                    props.edit(props.field, v);
                }} /> {props.field}</label>
    )
}

let InputSelect = (props) => {
    return (
        <label>
            {props.field ? <span> {props.field} </span> : ""}
            <select className="form-control pageSettingX2"
                value={props.inputValue}
                onChange={(e) => {
                    let value = e.target.value;
                    props.edit(props.field, value);
                }}>
                {
                    props.valuesArray.map((element, i) => {
                        return (
                            <option key={i} value={element}> {element} </option>
                        )
                    })
                }
            </select>
        </label>
    )
}

export class PanelRightPage extends React.Component {
    constructor(props) {
        super();
        this.edit = this.edit.bind(this);
    }

    edit(field, value) {
        this.props.editElement(field, value)        
    }

    chooseArr(arr, field) {
        for (let i = 0; i < arr.length; i++) {
            if (field === 'Type') {
                return Object.keys(this.props.ElementFields);
            }
            let test = arr[i][(field + 'Values')] || arr[i][(field + 'VALUES')] || arr[i][(field + 'values')];
            if (!!test && Array.isArray(test)) {
                return test
            }
        }
        return [];
    }

    getVisibleFields() {
        const allFields = this.props.ElementFields[this.props.selectedElement.Type];
        let visibleFields = [];
        for (let f in allFields) {
            if (allFields[f] !== 'internal') {
                let obj = {};
                obj[f] = allFields[f];
                visibleFields.push(obj)
            }
        }
        return visibleFields;
    }

    render() {
        const props = this.props;
        let visible = this.getVisibleFields();
        return (
            <div>
                {
                    visible.map((obj, i) => {
                        let field = Object.keys(obj)[0];
                        let comboValues = this.chooseArr(visible, field);
                        if (obj[field] === "TextField") {
                            return (
                                <div className="selectContainerX2" key={field + i}>
                                    <Input
                                        className="focusField"
                                        field={field}
                                        inputValue={props.selectedElement[field]}
                                        edit={this.edit} />
                                </div>
                            )
                        }
                        if (obj[field] === "Checkbox") {
                            return (
                                <div className="selectContainerX2" key={field + i}>
                                    <Checkbox
                                        field={field}
                                        inputValue={props.selectedElement[field]}
                                        edit={this.edit} />
                                </div>
                            )
                        }
                        if (obj[field] === "ComboBox") {
                            return (
                                <div className="selectContainerX2" key={field + i}>
                                    <InputSelect
                                        field={field}
                                        inputValue={props.selectedElement[field]}
                                        edit={this.edit}
                                        valuesArray={comboValues} />
                                </div>
                            )
                        }
                    })
                }
                {props.CompositeRules[props.selectedElement.Type] && <button className="btn btn-default"
                    onClick={() => {
                        props.showCode()
                    }}>View code</button>}
            </div>
        )
    }
}

PanelRightPage.propTypes = {
    selectedElement: PropTypes.object.isRequired,
    ElementFields: PropTypes.object.isRequired,
    CompositeRules: PropTypes.object.isRequired,
    editElement: PropTypes.func.isRequired,
    //showCode: PropTypes.func.isRequired
}
