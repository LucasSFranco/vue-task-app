import moment from 'moment';

class Task {
  constructor({
    id, completed, description, timestamp,
  } = {}) {
    this.id ||= id;

    this.completed ||= completed;
    this.description = description || '';
    this.timestamp ||= timestamp;
  }

  data() {
    return {
      ...this,
      completed: false,
      timestamp: new Date(),
    };
  }

  format() {
    return {
      ...this,
      timestamp: moment(this.timestamp).calendar(),
    };
  }

  toggleCompletion() {
    return {
      completed: !this.completed,
    };
  }

  validate() {
    if (!this.description) return false;

    return true;
  }
}

export default Task;
