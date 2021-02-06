<template>
  <div class="md:grid grid-cols-8">
    <div class="col-start-2 col-span-2">
      <Form />
    </div>
    <div class="col-end-8 col-span-2">
      <Summary />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form'
import Summary from '@/components/Summary'

export default {
  name: 'Home',
  components: {
    Form,
    Summary
  }
}
</script>
