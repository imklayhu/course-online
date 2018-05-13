<template>
  <div>
    <create-topic></create-topic>
    <topics-list></topics-list>
  </div>
</template>
<script>
import createTopic from '@/components/community/createTopic';
import topicsList from '@/components/community/topicsList';
export default {
  name: 'communityHome',
  components: {
    createTopic,
    topicsList
  }
}
</script>
