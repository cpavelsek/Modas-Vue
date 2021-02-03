<template>
<div>
    <!-- <h1>
        <h2>Enter Desired Page of events:</h2>
        <input id="desiredPage" type="text">
        <button v-on:click="searchByPage" v-b-tooltip.hover.right title="Go Ahead and Search!"> Search </button>
    </h1> -->
    <b-pagination
      pills 
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      size="lg"
      align="fill"
      aria-controls="my-table"
    >
    </b-pagination>

          
    <h1> 
         <b-table  responsive
                striped
                hover 
                ref="table" 
                :per-page="perPage" 
                :current-page="currentPage" 
                :items="modasEvents" 
                :fields="fields" 
        >
            <template #cell(timestamp)="data">
                    {{data.value}}
            </template>
            <template #cell(flagged)="data">
                    <!-- not flagged -->
                <div v-if="!data.value" v-on:click="flagChange(data)" :key="flagKey" @click="makeToast()"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                    </svg>
                </div>
                <div v-else v-on:click="flagChange(data)" @click="makeToast()">
                    <!-- flagged -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                    </svg>
                </div>
            </template>
         </b-table>
         
    </h1>
     <p class="mt-3">Current Page: {{ currentPage }}</p>
</div>

</template>

<script>

import axios from 'axios'
//import moment from 'moment'




export default {
  data() {
      return{
        flagKey: 0,
        selectedItem: "",
        perPage: 10,
        currentPage: 1,
        fields: [ 
                {
                key: 'eventId', 
                label: 'ID', 
                sortable: true
                },
                {
                key: 'flagged', 
                label: 'Flag', 
                sortable: true
                },
                {
                key: 'location.name', 
                label: 'Location', 
                sortable: true
                },
                {
                key: 'location.locationId',
                label: 'Location Id',
                sortable: true,    
                },
                {
                key: 'timeStamp',
                label: 'Date & Time',
                sortable: true,
                },
            ],
        modasEvents: [
            {timeStamp: Date},
            {flagged: Boolean},
            {location: {locationId: "", name: ""} },
            {eventId: ""}
        ],
      }
      
  },
    computed: {
        rows() {
            return this.modasEvents.length
        },
    },
  created() {

       // var modas = "https://modas-cep.azurewebsites.net/api/event/pagesize/10/page/1";
        var allModas = "https://modas-cep.azurewebsites.net/api/event/";


      axios.get(allModas).then(response => {
            let overallData = response.data;
            console.log(overallData);

            let events = response.data.events;
            console.log(events);

            let pagingInfo = response.data.pagingInfo;
            console.log(pagingInfo);


            for(let i = 0; i < overallData.length; i++){
                console.log(overallData[i]);
            }

            //console.log(typeof events)
            this.modasEvents = overallData;


      }).catch(error => console.log(error));

        


        // $(function () {
        // getEvents(1);

        // function getEvents(page) {
        //     $.getJSON({
        //     url:
        //         "https://modas-cep.azurewebsites.net/api/event/pagesize/10/page/" + page,
        //     success: function (response, textStatus, jqXhr) {
        //         console.log(response);
        //     },
        //     error: function (jqXHR, textStatus, errorThrown) {
        //         // log the error to the console
        //         console.log(
        //         "The following error occured: " + textStatus,
        //         errorThrown
        //         );
        //     },
        //     });
        // }
        // });
  },
  filters: {
      capitalize: function(value){
          var d = new Date(value);
          return 324 + d;
      }
  },
  methods:{
        searchByPage(){
            const modas = "https://modas-cep.azurewebsites.net/api/event/pagesize/10/page/";
            var desiredPage = document.getElementById("desiredPage").value;

            var desiredEvents = modas+desiredPage;
        axios.get(desiredEvents).then(response => {
                let overallData = response.data;
                console.log(overallData);

                let events = response.data.events;
                console.log(events);

                let pagingInfo = response.data.pagingInfo;
                console.log(pagingInfo);
                
                // var formattedDates = new Date(events.stamp);

                // formattedDates.toDateString();
                // console.log(formattedDates)

                //console.log(typeof events)
                this.modasEvents = events;

                //unecessary in current format 
                // this.stamp = formattedDates;
                // this.flag = events.flag;
                // this.id = events.id;
                // this.location = events.loc;

                //code below to get userInput for page of events
                

      }).catch(error => console.log(error));
      },
      searchAllEvents(){
            var allModas = "https://modas-cep.azurewebsites.net/api/event/";

            axios.get(allModas).then(response => {
                let overallData = response.data;
                console.log(overallData);

                let events = response.data;
                console.log(events);

                let pagingInfo = response.data.pagingInfo;
                console.log(pagingInfo);
                
                // var formattedDates = new Date(events.stamp);

                // formattedDates.toDateString();
                // console.log(formattedDates)

                //console.log(typeof events)
                this.modasEvents = events;

                //unecessary in current format 
                // this.stamp = formattedDates;
                // this.flag = events.flag;
                // this.id = events.id;
                // this.location = events.loc;

                //code below to get userInput for page of events
                

      }).catch(error => console.log(error));
      },
     flagChange(event){
        this.selectedItem = event;
         console.log( this.selectedItem.item.eventId);

            var flagChangeURL = "https://modas-cep.azurewebsites.net/api/event/";
            var flagUpdate = flagChangeURL + this.selectedItem.item.eventId;
            console.log(flagUpdate);

        //  if(this.selectedItem.value == true){
            console.log(this.selectedItem.value);
             axios({
                method: 'patch',
                url: flagUpdate,
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify([{ "op": "replace", "path": "Flagged", "value": !this.selectedItem.value }])
                }).catch(error => {
                    console.log(error.response)
                });

     
       },
     forceRerender(){
         this.flagKey =+1;
     },
     makeToast(append = false) {
        this.$bvToast.toast(`Updated flag for Event Id ${this.selectedItem.item.eventId}`, {
          title: 'Flag updated',
          autoHideDelay: 2500,
          appendToast: append
        })
      }  
  }
};
</script>

<style>

</style>