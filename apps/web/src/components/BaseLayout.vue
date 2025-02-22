<template>
    <div class="container my-5">
        <div class="card">
            <div class="card-header">
                <span>Windows Explorer</span>
            </div>
            <div class="card-body">
                <div class="row">
                    <!-- Menampilkan struktur folder -->
                    <div class="col-md-4">
                        <ul class="list-group">
                            <!-- Menampilkan base folder -->
                            <li v-for="folder in foldersData" :key="folder.id" class="list-group-item item-parent-folder">
                                <div class="list-text d-flex">
                                    <!-- Untuk membuka sub folder -->
                                    <span class="me-2" @click="toggleFolder(folder)">
                                        <i :class="folder.expanded ? 'bi bi-caret-down-fill' : 'bi bi-caret-right'"></i>
                                    </span>
                                    <!-- Untuk melihat detail folder -->
                                    <div class="w-100" @click="getDetailFolder(folder)">
                                        <i class="bi bi-folder-fill yellow-folder"></i> {{ folder.name }}
                                    </div>
                                </div>
                                <ul v-if="folder.children && folder.expanded" class="list-group ms-3">
                                    <!-- Menampilkan sub folder -->
                                    <SubFolder v-for="subFolder in folder.children" :key="subFolder.id" :folder="subFolder" @showDetails="getDetailFolder"/>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!-- Menampilkan detail folder -->
                    <div class="col-md-8 py-2" style="border-left: var(--bs-card-border-width) solid var(--bs-card-border-color);;">
                        <div v-if="selectedFolder">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <!-- Nama folder aktif -->
                                <h5>{{ selectedFolder.name }}</h5>
                                <!-- Pencarian nama folder / file -->
                                <div>
                                    <input type="text" v-model="pencarianData" class="form-control" placeholder="Pencarian">
                                </div>
                            </div>
                            <!-- Jika ada folder -->
                            <div v-if="selectedFolder.data" class="row g-3">
                                <!-- Folder -->
                                <div class="col-md-4 d-flex align-items-stretch" v-for="subfolder in filterFolder" :key="subfolder.id">
                                    <div class="card card-folder w-100" @click="getDetailFolder(subfolder)">
                                        <div class="card-body py-1 d-flex flex-row align-items-center">
                                            <i class="bi bi-folder-fill i-icon-folder"></i>
                                            <span class="ms-3">
                                                {{ subfolder.name }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- File -->
                                <div class="col-md-4 d-flex align-items-stretch" v-for="file in filterFile" :key="file.id">
                                    <div class="card w-100">
                                        <div class="card-body py-1 d-flex flex-row align-items-center">
                                            <i class="bi bi-file-earmark-fill i-icon-file"></i>
                                            <span class="ms-3 text-break">
                                                {{ file.name }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Jika folder kosong -->
                            <div v-else class="text-center">Folder ini kosong</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';
    import SubFolder from './SubFolder.vue';

    export default {
        components: {
            SubFolder,
        },
        setup() {
            const foldersData = ref([]); // Menyimpan data folders
            const selectedFolder = ref(null); // Menyimpan data folder terpilih
            const pencarianData = ref(''); // Menyimpan data kata pencarian

            // Pencarian data folder
            const filterFolder = computed(() => {
                // Jika kata pencarian kosong
                if (!selectedFolder.value || !pencarianData.value) {
                    return selectedFolder.value?.children || [];
                }

                // Menampilkan data sesuai dengan kata pencarian
                return selectedFolder.value.children.filter((dt) => {
                    return dt.name.toLowerCase().includes(pencarianData.value.toLowerCase());
                });
            });

            // Pencarian data files
            const filterFile = computed(() => {
                // Jika kata pencarian kosong
                if (!selectedFolder.value || !pencarianData.value) {
                    return selectedFolder.value?.files || [];
                }

                // Menampilkan data sesuai dengan kata pencarian
                return selectedFolder.value.files.filter((dt) => {
                    return dt.name.toLowerCase().includes(pencarianData.value.toLowerCase());
                });
            });

            // Mengambil data folders dari backend
            const getFolderData = async () => {
                axios.get(`/folder`)
                    .then(res => {
                        const folders = res.data.data;
                        if (folders.length) {
                            foldersData.value = folders.map(folder => addFolderProperty(folder));
                        }
                    })
                    .catch(error => { // Menampilkan error
                        alert(error.message)
                        console.error("Error fetching data folders:", error);
                    });
            };

            // Mengambil data detail folder dari backend
            const getDetailFolder = async(folder) => {
                pencarianData.value = '';
                axios.get(`/folder/${folder.id}`)
                    .then(res => {
                        const { folders, files } = res.data.data;
                        const dataFolder = folders.length > 0; 
                        const dataFile = files.length > 0;

                        selectedFolder.value = {
                            name: folder.name,
                            data: dataFolder || dataFile,
                            children: dataFolder ? folders : [],
                            files: dataFile ? files : [],
                        };
                    })
                    .catch(error => { // Menampilkan error
                        console.error("Error fetching data detail folder:", error);
                    });
            }

            // Menambah properti expanded untuk buka / tutup folder di panel kiri, dan childernLoaded untuk lazy load data childern
            const addFolderProperty = (folder) => {
                return {
                    ...folder,
                    expanded: false,
                    children: folder.children ? folder.children.map(addFolderProperty) : [],
                    childrenLoaded: false
                };
            };

            // Toggle untuk buka/tutup folder
            const toggleFolder = (folder) => {
                folder.expanded = !folder.expanded;
            };

            // Menampilkan folders data
            onMounted(getFolderData);

            return {
                foldersData,
                selectedFolder,
                pencarianData,
                filterFolder,
                filterFile,
                toggleFolder,
                getDetailFolder
            };
        },
    };
</script>

<style scoped>
</style>