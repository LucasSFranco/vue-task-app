import moment from 'moment';

class Task {
  constructor(task) {
    this.id ||= task?.id;

    this.completed ||= task?.completed;
    this.description = task?.description || '';
    this.timestamp ||= task?.timestamp;
  }

  data() {
    return {
      ...this,
      completed: false,
      timestamp: new Date(),
    };
  }

  format(locale) {
    return {
      ...this,
      timestamp: moment(this.timestamp).locale(locale).calendar(),
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
