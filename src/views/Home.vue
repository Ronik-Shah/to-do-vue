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
          <v-btn icon>
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
      this.$http.post('http://localhost:8000/tasks/', {
        title: this.task.title,
        content: this.task.content,
        date: new Date(this.task.date),
      }).then(function(data) {
        console.log(data);
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
