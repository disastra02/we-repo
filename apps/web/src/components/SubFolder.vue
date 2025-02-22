<template>
    <li class="list-group-item">
        <div class="list-text d-flex">
            <!-- Untuk membuka sub folder -->
            <span class="me-2" @click="toggleFolder">
                <i :class="folder.expanded ? 'bi bi-caret-down-fill' : 'bi bi-caret-right'"></i>
            </span>
            <!-- Untuk melihat detail folder -->
            <div class="w-100" @click="showDetails(folder)">
                <i class="bi bi-folder-fill yellow-folder"></i> {{ folder.name }}
            </div>
        </div>
        <ul v-if="folder.children.length && folder.expanded" class="list-group ms-3">
            <!-- Rekursif untuk menampilkan sub folder -->
            <SubFolder v-for="subFolder in folder.children" :key="subFolder.id" :folder="subFolder" @showDetails="$emit('showDetails', $event)"/>
        </ul>
    </li>
</template>

<script>
    import { ref } from "vue";
    import axios from "axios";
    export default {
        name: "SubFolder",
        props: {
            folder: Object,
        },
        setup(props, {emit}) {
            const folder = ref(props.folder); // Menyimpan data folder

            // Mengambil data sub folder dari backend
            const getSubFolderData = async (folder) => {
                axios.get(`/folder/${folder.id}`)
                    .then(res => {
                        const { folders } = res.data.data;
                        if (folders.length > 0) { // Jika data folders ada
                            folder.children = folders.map((child) => ({
                                ...child,
                                expanded: false,
                                children: [],
                                childrenLoaded: false,
                            }));

                            folder.children.childrenLoaded = true;
                        }
                    })
                    .catch(error => { // Menampilkan error
                        console.error("Error loading children:", error);
                    });
            };

            // Toggle untuk buka/tutup folder
            const toggleFolder = async () => {
                folder.value.expanded = !folder.value.expanded;

                // Jika folder perlu memuat data sub folder (lazy loading)
                if (folder.value.expanded && folder.value.children.length === 0 && !folder.value.childrenLoaded) {
                    await getSubFolderData(folder.value);
                }
            };

            // Mengirimkan event untuk menampilkan detail folder
            const showDetails = () => {
                emit('showDetails', props.folder);
            };

            return {
                // eslint-disable-next-line vue/no-dupe-keys
                folder,
                toggleFolder,
                showDetails
            };
        },
    };
</script>

<style scoped>
</style>