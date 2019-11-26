import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/UpdateModal.scss";

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tag: '',
      emptyInput: ""
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let { updateItem } = nextProps;
    if (Object.keys(updateItem).length > 0) {
      this.setState({
        title: updateItem.title,
        content: updateItem.content,
        tag: updateItem.tag
      })
    }
  }
  handleUpdate(id) {
    let { title, tag, content } = this.state;
    if (!title && content) {
      this.setState({
        emptyInput: "title"
      });
      return;
    } else if (!content && title) {
      this.setState({
        emptyInput: "content"
      });
      return;
    } else if (!title && !content) {
      this.setState({
        emptyInput: "both"
      });
      return;
    } else {
      this.setState({
        emptyInput: ""
      });
    }

    fetch("http://localhost:3001/update/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content,
        tag: tag
      })
    })
      .then(() => {
        this.props.handleUpdate(true);
        this.setState({
          title: "",
          content: "",
          tag: "",
          emptyInput: ""
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  handleCancel() {
    this.props.callback();
  }
  handleEmptyInput() {
    let { emptyInput } = this.state;
    if (emptyInput === "title") {
      return this.errorMessage("Title");
    } else if (emptyInput === "content") {
      return this.errorMessage("Content");
    } else if (emptyInput === "both") {
      return (
        <div className="both-error-container">
          {this.errorMessage("Title")}
          {this.errorMessage("Content")}
        </div>
      );
    }
  }
  errorMessage(type) {
    let { emptyInput } = this.state;
    return (
      <div className="error-container">
        {type} is required
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => {
            if (emptyInput === "both" && type === "Title") {
              this.setState({
                emptyInput: "content"
              });
            } else if (emptyInput === "both" && type === "Content") {
              this.setState({
                emptyInput: "title"
              });
            } else {
              this.setState({
                emptyInput: ""
              });
            }
          }}
        ></i>
      </div>
    );
  }

  render() {
    let { updateItem, show } = this.props;
    let { title, tag, content, emptyInput } = this.state;
    return (
      <Modal
        show={show}
        className="update-item-modal"
        onHide={() => this.props.callback()}
      >
        <Modal.Body>
          <div className="modal_header">
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <span className="modal_title">Update Note</span>
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => this.handleCancel()}
            ></i>
          </div>
          {emptyInput ? this.handleEmptyInput() : ""}
          <div className="modal-input-container">
            <div>Title</div>
            <input
              type="text"
              value={title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />
            <div>Content</div>
            <textarea
              rows="4"
              value={content}
              onChange={e => {
                this.setState({ content: e.target.value });
              }}
            />
            <div>Tags</div>
            <input
              type="text"
              value={tag}
              onChange={e => {
                this.setState({ tag: e.target.value });
              }}
            />
          </div>
          <div className="button-group">
            <Button
              variant="success"
              onClick={() => this.handleUpdate(updateItem._id)}
            >
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
              Update
            </Button>
            <Button variant="danger" onClick={() => this.handleCancel()}>
              <i className="fa fa-times" aria-hidden="true"></i>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateModal;