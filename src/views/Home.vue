<template>
  <div>
	<RocketbookLogo id="logo" />
	<br>

	<div v-show="isInMobile()">
		<p id="openAppLabel">Ouvrir l'application</p>
		
		<RocketbookShortcut id="shortcut" />
	</div>

	<div>
		<label style="color: white">Version actuelle</label>

	</div>

	<div>
		<label style="color: white">Dernière version</label>
	</div>

  </div>
</template>

<script>
import RocketbookLogo from '@/components/RocketbookLogo.vue';
import RocketbookShortcut from '@/components/RocketbookShortcut.vue';

export default {
	name: 'Home',
	components: {
		RocketbookLogo,
		RocketbookShortcut
	},
	data: function() {
		return {
			currentVersion: null,
			lastVersion: null
		};
	},
	created: async function() {
		await this.getLastVersion();

		if (localStorage.getItem('version') == null) {
			const version = this.getLastVersion();

			localStorage.setItem('version', version);
			this.currentVersion = version;
		} else {
			this.currentVersion = localStorage.getItem('version');
		}
	},
	methods: {
		isInMobile: function () {
			return navigator.appVersion.includes('Android');
		},
		getLastVersion: async function() {
			
		}
	}
};
</script>

<style scoped>
	#logo, #shortcut {
		text-align: center;
	}

	#openAppLabel {
		text-align: center;
		color: white;
		font-size: 10px;
	}


</style>