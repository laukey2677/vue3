<template>
	<div class="login">
		<div class="login-wrap">
			<ul class="ul">
				<li
					:class="['li',{'active':item.id == mode}]"
					v-for="(item) in menuList"
					:key="item.id"
					@click="mode = item.id"
				>{{ item.text }}</li>
			</ul>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
				<label>邮箱</label>
				<el-form-item prop="email">
					<el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<label>密码</label>
				<el-form-item prop="password">
					<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<label>请再次输入密码</label>
				<el-form-item prop="retirepwd" v-if="mode==2">
					<el-input type="retirepwd" v-model="ruleForm.retirepwd" autocomplete="off"></el-input>
				</el-form-item>
				<label>验证码</label>
				<el-form-item prop="vcode">
					<el-row :gutter="20">
						<el-col :span="16">
							<el-input v-model="ruleForm.vcode"></el-input>
						</el-col>
						<el-col :span="8">
							<el-button class="btn" type="success" size="medium" @click="submitForm('ruleForm')">提交</el-button>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item>
					<el-button class="btn" type="primary" size="medium" @click="submitForm('ruleForm')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import {
	stripscript,
	validateEmail,
	validatePwd,
	validateVcode
} from "@/utils/validate.js";
import { reactive, ref } from "@vue/composition-api";

export default {
	name: "login",
	setup (props, context) {
		const menuList = reactive([
			{ id: 1, text: "登录" },
			{ id: 2, text: "注册" }
		]);
		const mode = ref(1);

		const ruleForm = reactive({
			email: "",
			password: "",
			retirepwd: "",
			vcode: ""
		});
        const checkEmail = (rule, value, callback) => {
            value = stripscript(value);
            ruleForm.email = value;
            if (!value) return callback(new Error("请输入邮箱"));
            else if (validateEmail(value)) return callback(new Error("邮箱格式不合法"));
            else return callback();
		};
		const checkPwd = (rule, value, callback) => {
            value = stripscript(value);
            ruleForm.password = value;
			if (!value) return callback(new Error("请输入密码"));
            else if (validatePwd(value)) return callback(new Error("密码格式不正确，请输入至少包含数字、字母的6-8位密码"));
            else return callback();
		};
		const checkRePwd = (rule, value, callback) => {
            value = stripscript(value);
            ruleForm.retirepwd = value;
			if (!value) return callback(new Error("请输入密码"));
            else if (validatePwd(value)) return callback(new Error("密码格式不正确，请输入至少包含数字、字母的6-8位密码"));
            else if (value != stripscript(this.ruleForm.password)) return callback(new Error("两次输入的密码不正确"));
            else return callback();
		};
		const checkVcode = (rule, value, callback) => {
			value = stripscript(value);
            ruleForm.vcode = value;
			if (!value) return callback(new Error("请输入验证码"));
            else if (validateVcode(value)) return callback(new Error("验证码格式不正确，请输入至少包含数字或字母的6位验证码"));
            else return callback();
		};

		const submitForm = formName => {
			context.refs[formName].validate(valid => {
				if (valid) {
					alert("submit!");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		};
		const resetForm = formName => {
			this.$refs[formName].resetFields();
        };
        const rules = reactive({
			email: [{ validator: checkEmail, trigger: "blur" }],
			password: [{ validator: checkPwd, trigger: "blur" }],
			retirepwd: [{ validator: checkRePwd, trigger: "blur" }],
			vcode: [{ validator: checkVcode, trigger: "blur" }]
        });
		return {
			menuList,
			mode,
			ruleForm,
			rules,
			submitForm,
			resetForm
		};
	}
};
</script>

<style lang="scss" scoped>
.login {
	position: relative;
	height: 100%;
	width: 100%;
	background-color: #344a5f;
	.login-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 360px;
		margin: 0 auto;
		.ul {
			margin: 0;
			padding: 0;
			text-align: center;
			.li {
				display: inline-block;
				width: 100px;
				line-height: 36px;
				list-style: none;
				border-radius: 3px;
			}
			.active {
				color: #fff;
			}
			.li:hover {
				color: yellow;
			}
		}
		.el-form {
			margin-top: 30px;
			label {
				line-height: 36px;
			}
			.btn {
				display: block;
				width: 100%;
			}
		}
	}
}
</style>