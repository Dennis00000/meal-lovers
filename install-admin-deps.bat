@echo off
echo Installing admin dependencies...
cd admin
npm install antd @ant-design/icons @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-tabs lucide-react --save
echo Dependencies installed successfully!
cd .. 