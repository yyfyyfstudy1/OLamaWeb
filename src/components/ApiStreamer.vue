<template>
    <div>
        <input v-model="prompt" @keyup.enter="fetchStreamedResponse" placeholder="留下你的问题">
        <button @click="fetchStreamedResponse">Ask</button>
        <div v-if="loading">Loading...</div>
        <div>{{ completeResponse }}</div>  <!-- 显示完整的响应 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            prompt: '',
            responses: [],
            completeResponse: '',  // 添加一个新的数据项来存储完整的响应
            loading: false
        };
    },
    methods: {
        fetchStreamedResponse() {
            this.responses = [];  // 清除之前的响应
            this.completeResponse = '';  // 清空完整响应
            this.loading = true;
            const self = this;  // 保存 'this' 的引用

            fetch('https://f38c-122-151-149-14.ngrok-free.app/lama', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama3",
                    prompt: this.prompt
                })
            }).then(response => {
                const reader = response.body.getReader();
                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            self.loading = false;  // 结束加载状态
                            return;
                        }
                        const chunk = new TextDecoder("utf-8").decode(value);
                        try {
                            const result = JSON.parse(chunk);
                            self.responses.push(result);  // 将整个对象存储（可选）
                            self.completeResponse += result.response;  // 拼接响应
                        } catch (e) {
                            console.error('JSON parse error:', e);
                        }
                        push();  // 继续读取下一个数据块
                    }).catch(error => {
                        console.error('Stream reading error:', error);
                        self.loading = false;
                    });
                }
                push();
            }).catch(error => {
                console.error('Fetch error:', error);
                self.loading = false;
            });
        }
    }
};
</script>


