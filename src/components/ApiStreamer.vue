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

            fetch('https://ddc0-122-151-149-14.ngrok-free.app/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama3",
                    prompt: this.prompt
                })
            }).then(response => {
                let receivedData = '';
                const reader = response.body.getReader();
                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            self.loading = false;  // 结束加载状态
                            try {
                                // 尝试分割接收到的整个数据流，并解析每个独立的 JSON 对象
                                receivedData.split("}\n{").forEach((jsonStr, index, array) => {
                                    // 修正因分割导致的不完整 JSON 字符串
                                    if (index > 0) { jsonStr = "{" + jsonStr; }
                                    if (index < array.length - 1) { jsonStr += "}"; }
                                    if (jsonStr.trim()) {
                                        const result = JSON.parse(jsonStr);
                                        self.responses.push(result);  // 处理每个解析后的对象
                                        self.completeResponse += result.response;  // 拼接响应
                                    }
                                });
                            } catch (e) {
                                console.error('JSON parse error at the end of the stream:', e);
                            }
                            return;
                        }
                        receivedData += new TextDecoder("utf-8").decode(value);
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


