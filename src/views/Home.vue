<template>
  <div>
    <h1 align="center">Welcome to Tasks</h1>
    <v-col>
      <v-list>
     <v-list-item
        v-for="task in tasks"
        :key="task.id"
      >
        <v-list-item-avatar>
        {{ task.createdAt.substring(0,2) }}          
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="task.name"></v-list-item-title>

          <v-list-item-subtitle v-text="task.content"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon v-on:click="deleteTask(task.id)">
            <v-icon color="red lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    </v-col>
    <v-col>
      <v-form>
        <v-text-field
          v-model="task.name"
          :counter="50"
          label="Task Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="task.content"
          :counter="100"
          label="Task Content"
          required
        ></v-text-field>
        <h3>Date</h3>
         <v-date-picker v-model="task.date"></v-date-picker>
        <v-btn
          color="success"
          class="mr-4"
          @click.prevent="add"
        >
          Add Task
        </v-btn>
      </v-form>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      task: {
        name: "",
        content: "",
        date: "",
      },
      tasks: [],
    };
  },
  methods : {
    add(){
      var date = new Date(this.task.date);
      console.log(date);
      console.log(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getYear());
      this.$http.post('http://localhost:8000/tasks/', {
        name: this.task.name,
        content: this.task.content,
        createdAt: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      }).then(function(data) {
        console.log(data);
        alert("Task Created");
      });
    },
    deleteTask(id){
    this.$http.delete('http://localhost:8000/tasks/' + id + '/').then(function(data){
      console.log(data);
      alert("Task Deleted Refresh Page.");
    });
    }
  },
  created(){
    this.$http.get('http://localhost:8000/tasks/').then(function(data) {
      this.tasks = data.body;
    })
  }
}
</script>
