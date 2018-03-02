<template>
	<sidebar-container :sidebars="sidebars"></sidebar-container>
  
</template>
<script>
    import sidebars from '@/config/sidebar.json';
	export default {
		data() {
            return {
                sidebars
            }
        }
	}
</script>