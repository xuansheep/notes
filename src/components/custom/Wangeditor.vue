<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
        name: "Wangeditor",
        data () {
            return {
                editor: null,
                currentValue: '',
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: 'please enter the content'
            },
            height: {
                type: Number,
                default: 500
            },
            uploadImgServer: {
                type: String,
                default: ''
            },
            uploadFileName: {
                type: String,
                default: 'file'
            }
        },
        watch: {
            value (val) {
                if (val) {
                    if (val !== this.currentValue) {
                        // 内容输入
                        this.editor.txt.html(val);
                    }
                }else {
                    // 内容销毁
                    this.editor.txt.html('');
                }
            },
            currentValue (val) {
                this.$emit('input', val)
            }
        },
        mounted() {
            // 实例化
            this.editor = new E(this.$refs.editor);
            // 监控变化，同步到currentValue
            this.editor.config.onchange = (html) => {
                this.currentValue = html
            };
            this.editor.config.height = this.height;
            this.editor.config.zIndex = 100;
            this.editor.config.placeholder = this.placeholder;
            // 设置上传图片
            this.editor.config.uploadImgShowBase64 = true;
            this.editor.config.uploadImgServer = this.uploadImgServer;
            this.editor.config.uploadFileName = this.uploadFileName;
            this.editor.config.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    insertImg(result.data.url);
                }
            };
            // 菜单
            this.editor.config.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'code',  // 代码块
                'image',  // 插入图片
                'table',  // 表格
            ];
            this.editor.config.pasteFilterStyle = false;
            // 创建编辑器
            this.editor.create();
            // 初始化内容
            this.editor.txt.html(this.value);

        },
        beforeDestroy () {
            this.editor.destroy();
            this.editor = null
        }
    };
</script>
<style scoped>
    >>> .w-e-toolbar {
        display: flex;
        padding: 0 6px;
        flex-wrap: wrap;
        position: relative;
        width: 100%;
    }
</style>