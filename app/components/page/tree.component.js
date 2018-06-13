import { GEAR, ADD, TRASH } from '../../style/picsPath';
import SortableTree from 'react-sortable-tree';
//smallInvisibleInput
// let focus = () => {
//     let e = $('#smallInvisibleInput');
// }
export class Tree extends React.Component {
    droppedItem = null;

    canDrop({ node, nextParent, prevPath, nextPath }) {
        if (nextParent === null || nextParent.isSection) {
            this.droppedItem = node
            return true;
        }
        return false
    }

    getHeight() {
        return 50 * this.props.resultTree.length + 200;
    }

    render() {
        const props = this.props;
        return (
            <div style = {{height: this.getHeight()}}>
                <SortableTree
                    canDrop={this.canDrop}
                    treeData={props.resultTree}
                    onChange={(data) => {
                        props.changeTree(data, this.droppedItem)
                    }}
                    generateNodeProps={({ node }) => (
                        {
                            buttons: (node.isSection) ? [
                                <button className="btn btn-default"
                                    onClick={() => {
                                        props.selectElement(node.elId);
                                    }}
                                >
                                    <img src={GEAR} />
                                </button>,
                                <button className="btn btn-default"
                                    onClick={() => {
                                        props.addElement(node.elId)
                                    }}
                                >
                                    <img src={ADD} />
                                </button>,
                                <button className="btn btn-default"
                                    onClick={() => {
                                        props.deleteElement(node.elId)
                                    }}
                                >
                                    <img src={TRASH} />
                                </button>
                            ] : [<button className="btn btn-default"
                                onClick={() => {
                                    props.selectElement(node.elId);
                                }}
                            >
                                <img src={GEAR} />
                            </button>,
                            <button className="btn btn-default"
                                onClick={() => {
                                    props.deleteElement(node.elId)
                                }}
                            >
                                <img src={TRASH} />
                            </button>]
                        }
                    )}
                />
            </div>)
    }
}