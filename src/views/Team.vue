<template>
  <p class="text-center font-bold text-4xl py-5 md:pb-20 md:pt-10 md:text-5xl">TEAM</p>
  <div class="md:flex md:flex-row md:justify-center md:space-y-0 md:space-x-5 flex flex-col md:items-baseline items-center space-y-4" id="Team">
    <div v-for="(member, index) in team" :key="index" class="loopMember">
      <div id="container-member" class="flex flex-col text-2xl font-medium md:text-lg">
        <img
          :src="require(`@/assets/${member.image}`)"
          class="w-96 h-160 object-cover mb-2 md:w-72 md:h-160"
        />
        <p>{{ member.studentId }}</p>
        <p class="mb-5">{{ member.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Team",
  data() {
    return {
      team: [
        {
          studentId: "62130500009",
          name: "Kampol Thaipricha (Nui)",
          image: "62130500009.jpg",
        },
        {
          studentId: "62130500017",
          name: "Jirawath Anantheerathat (Jiw)",
          image: "62130500017.jpg",
        },
        {
          studentId: "62130500078",
          name: "Wajanaporn Yontrachiwa (Green)",
          image: "62130500078.jpg",
        },
      ],
    };
  },
};
</script>